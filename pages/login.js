import { Grid} from "@mui/material";
import { Layout } from '../layout/Layout';
import { Section, SectionText, SectionTitle } from '../styles/GlobalComponents';
import { StyledTextField } from "../components/ContactMe/ContactMe";
import Button from '../styles/GlobalComponents/Button';
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const Login = () => {

    const { setUser} = useAuth();
    const router = useRouter();

    async function handleOnSubmit(e) {
        e.preventDefault();

        const formData = {};
        Array.from(e.currentTarget.elements).forEach((field) => {
            if (!field.name) return;
            formData[field.name] = field.value;
        });

        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(formData),
        })

        if (res.ok) {
            const { token } = await res.json();
            sessionStorage.setItem('authToken', token);
            setUser(formData['username']);
            router.push('/');
        } else {
            throw new Error('Failed to log in');
        };
    }

  return (
    <Layout shortContent = {true}>
      <Section>
        <SectionTitle>Log In</SectionTitle>
        <SectionText>This is my personal log in to access my random widgets I thought of making off the top of my head .</SectionText>
        <form method="post" onSubmit={handleOnSubmit}>
            <Grid container spacing={3} className="login-form-grid">
                <Grid xs={12} sm={12} item>
                    <StyledTextField
                        placeholder="Username"
                        variant="outlined"
                        name="username"
                        fullWidth
                        required
                        className="contact-input"
                    />
                </Grid>
                <Grid xs={12} sm={12} item>
                    <StyledTextField
                        type='password'
                        placeholder="Password"
                        variant="outlined"
                        name="password"
                        fullWidth
                        required
                        className="contact-input"
                    />
                </Grid>
                <Grid item xs={12} sx = {{display : 'flex', justifyContent : 'center'}}>
                    <Button type='submit'>Log in</Button>
                </Grid>
            </Grid>
        </form>
      </Section>
    </Layout>
  );
};

export default Login;
