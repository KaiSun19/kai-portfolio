//TODO: we need a way to enable sign up only if i lose my own account
// "use client";

// import { Grid } from "@mui/material";
// import { Layout } from "../../layout/Layout";
// import {
//   Section,
//   SectionText,
//   SectionTitle,
// } from "../../styles/GlobalComponents";
// import { StyledTextField } from "../../components/ContactMe/ContactMe";
// import Button from "../../styles/GlobalComponents/Button";
// import { useAuth } from "../../context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// const Login = () => {
//   const { setUser, setAuthAlertOpen } = useAuth();
//   const router = useRouter();

//   const [registerLoading, setRegisterLoading] = useState(false);

//   async function handleOnSubmit(e) {
//     e.preventDefault();

//     const formData = {};
//     Array.from(e.currentTarget.elements).forEach((field) => {
//       if (!field.name) return;
//       formData[field.name] = field.value;
//     });

//     setRegisterLoading(true);

//     const res = await fetch("/api/auth/register", {
//       method: "POST",
//       body: JSON.stringify(formData),
//     });

//     if (res.ok) {
//       setRegisterLoading(false);
//       router.push("/");
//       setAuthAlertOpen("Sign up successful");
//     } else {
//       throw new Error("Failed to register");
//     }
//   }

//   return (
//     <Layout shortContent={true}>
//       <Section>
//         <SectionTitle>Register</SectionTitle>
//         <form method="post" onSubmit={handleOnSubmit}>
//           <Grid container spacing={3} className="login-form-grid">
//             <Grid xs={12} sm={12} item>
//               <StyledTextField
//                 placeholder="Username"
//                 variant="outlined"
//                 name="username"
//                 fullWidth
//                 required
//                 className="contact-input"
//               />
//             </Grid>
//             <Grid xs={12} sm={12} item>
//               <StyledTextField
//                 type="password"
//                 placeholder="Password"
//                 variant="outlined"
//                 name="password"
//                 fullWidth
//                 required
//                 className="contact-input"
//               />
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               sx={{ display: "flex", justifyContent: "center" }}
//             >
//               <Button type="submit" disabled={loginLoading}>
//                 Log in
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Section>
//     </Layout>
//   );
// };

// export default Login;
