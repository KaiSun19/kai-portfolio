import { useState } from "react";
import useUser from "../utils/useUser";
import { Layout } from '../layout/Layout';
import { StyledTextField } from "../components/StyledComponents";
import { Section, SectionDivider, SectionTitle } from '../styles/GlobalComponents'
import Button from '../styles/GlobalComponents/Button';

export default function Login() {
  // here we just check if user is already logged in and redirect to admin
  const { mutateUser } = useUser({
    redirectTo: "/admin",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const body = {
      password: e.currentTarget.password.value,
    };

    const userData = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const user = await userData.json();

    try {
      await mutateUser(user);
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg(error.data.message);
    }
  }

  return (
    <Layout>
      <Section id="login" >
      <SectionTitle>Log In</SectionTitle>
        <form onSubmit={handleSubmit}>

          <StyledTextField placeholder="Enter Password" variant="outlined" type = 'password' name = 'password' fullWidth required className='contact-input' />

          <Button type="submit" sx ={{marginTop : '16px'}}>Submit</Button>

          {errorMsg && <p>{errorMsg}</p>}
        </form>
      </Section>
    </Layout>
  );
}
