import { Grid} from "@mui/material";
import { Layout } from '../layout/Layout';
import { Section, SectionText, SectionTitle } from '../styles/GlobalComponents';
import { StyledTextField } from "../components/ContactMe/ContactMe";
import Button from '../styles/GlobalComponents/Button';

const Login = () => {

    async function handleOnSubmit(e) {
        e.preventDefault();

        const formData = {};
        console.log(e);
        Array.from(e.currentTarget.elements).forEach((field) => {
            if (!field.name) return;
            formData[field.name] = field.value;
        });

        console.log(formData);

        // await fetch("/api/auth", {
        //     method: "POST",
        //     body: JSON.stringify(formData),
        // })
        //     .then(() => {
        //     console.log("Email sent");
        //     })
        //     .catch((e) => {
        //     console.log("error: " + e);
        //     });
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
