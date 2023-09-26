
import { SocialIcons } from '../components/Header/HeaderStyles';
import { BlogCard, GridContainer, HeaderThree, Hr, Img, TitleContent } from '../components/Projects/ProjectsStyles';
import { Layout } from '../layout/Layout';
import { Section, SectionTitle } from '../styles/GlobalComponents';
import { withSessionSsr } from '../utils/session';
import { AiFillSmile  } from "react-icons/ai";

export default function Admin() {
  
  // Users will never see this unless they're logged in.
  return (
    <Layout>
    <Section id="admin" >
    <SectionTitle>Admin dashboard</SectionTitle>
    <GridContainer >
      <BlogCard className = 'widget-card' id = {`widget-1`} >
      <SocialIcons href="/druid">
        <AiFillSmile size = '8rem'/>
      </SocialIcons>
        <TitleContent>
          <HeaderThree title>Druid</HeaderThree>
          <Hr />
        </TitleContent>
      </BlogCard>
    </GridContainer>
    </Section>
  </Layout>
  );
}

export const getServerSideProps = withSessionSsr(async function ({ req, res }) {

  const user = req.session.user;

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  // You can return data here from a database knowing only authenticated users (you) will see it.
  return { props: {} };
});