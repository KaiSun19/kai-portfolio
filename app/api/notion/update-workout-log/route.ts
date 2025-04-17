import { NextRequest, NextResponse } from "next/server";

const { Client } = require("@notionhq/client");

import { getCurrentDate } from "@/utils/utils";
import { WorkoutPlan } from "@/components/widgets/workout/WorkoutWidget";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const convertJSONToRichText = (plan: WorkoutPlan[]) => {
  let rich_text = "";
  plan.map((workout) => {
    rich_text += `${workout.type}\n`;
    Object.keys(workout.workouts).map((name) => {
      rich_text += `• ${workout.workouts[name]} `;
      rich_text += `${name}\n`;
    });
  });
  return rich_text.trim();
};

const convertWeightedWorkoutToRichText = (weighted_workout) => {
  let rich_text = `Type: ${weighted_workout.type}\n`;

  weighted_workout.sets.forEach((set) => {
    const { sets, reps, weight } = set; 
    rich_text += `• ${sets} ${weight} for ${reps}\n`;
  });

  return rich_text.trim();
};

const getTotalPoints = (plan: WorkoutPlan[]) => {
  return plan.reduce((totalPoints, workout) => totalPoints + workout.points, 0);
};

export async function POST(req: NextRequest) {
  const databaseId = "174d35492b1b80789291f6a9dcc00396";
  const currentDate = getCurrentDate();

  const workout = await req.json();

  const {weighted_workout} = workout.pop();
  const rich_text_weighted_workout = convertWeightedWorkoutToRichText(weighted_workout)
  const rich_text_workout = convertJSONToRichText(workout);
  const total_points = getTotalPoints(workout);

  if (req.method === "POST") {
    const response = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: databaseId,
      },
      properties: {
        Date: {
          title: [
            {
              text: {
                content: currentDate,
              },
            },
          ],
        },
        Plan: {
          rich_text: [
            {
              text: {
                content: `${rich_text_workout}\n${rich_text_weighted_workout}`
              },
            },
          ],
        },
        "Total Points": {
          number: total_points,
        },
      },
    });

    return NextResponse.json(response, { status: 200 });
  } else {
    return NextResponse.json(
      { message: `Method ${req.method} Not Allowed` },
      { status: 405 }
    );
  }
}
