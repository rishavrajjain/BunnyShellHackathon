/*
=========================================================
* Material Kit 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";

// Material Kit 2 PRO React examples
import SimpleInfoCard from "layouts/SimpleInfoCard";

function Information() {
  return (
    <MKBox component="section" py={{ xs: 6, md: 12 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center">
          <Grid
            item
            xs={12}
            md={4}
            sx={{ ml: { xs: 0, md: "auto" }, mr: { xs: 0, md: 6 }, mb: { xs: 4, md: 0 } }}
          >
            <Stack spacing={{ xs: 4, md: 8 }}>
              <SimpleInfoCard
                icon="payment"
                title="Streamline Legal Document Analysis "
                description="With our advanced technology, you can now analyze legal documents efficiently. Simply upload your legal document to the app, and it will be processed quickly and accurately. Our app utilizes powerful algorithms and natural language processing techniques to extract key information, identify relevant sections, and highlight critical details, ensuring that you can quickly grasp the essence of the document without spending hours poring over dense text."
              />
              <SimpleInfoCard
                icon="insights"
                title="Summarize with Precision "
                description="Gone are the days of lengthy, convoluted legal jargon. Our app generates concise and informative summaries, distilling the core concepts of the document into easily digestible sections. Whether you're a legal professional, a student, or an individual seeking clarity, our summarization feature provides you with a comprehensive understanding of the document in a fraction of the time."
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ mr: { xs: 0, md: "auto" }, ml: { xs: 0, md: 6 }, mb: { xs: 4, md: 0 } }}
          >
            <Stack spacing={{ xs: 4, md: 8 }}>
              <SimpleInfoCard
                icon="access_alarms"
                title="Multi-Language Translation "
                description="In a diverse country like India, where multiple languages are spoken, understanding legal documents can be a challenge for non-native speakers. Our app bridges this gap by offering accurate translations of legal documents into various Indian languages. Our translation feature ensures that legal information is accessible to individuals who may not be fluent in the document's original language. This capability enhances communication, comprehension, and access to justice for all." />

            </Stack>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
