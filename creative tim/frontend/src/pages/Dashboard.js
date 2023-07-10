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
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import BarChart from 'react-bar-chart';
import SimpleInfoCard from "layouts/SimpleInfoCard";
import './dashboard.css'


// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKBadge from "components/MKBadge";

// Material Kit 2 PRO React examples
import Navbar from "layouts/Navbar";



// Routes
import routes from "routes";

import { useState } from 'react'
import axios from "axios";


// Images
import bgImage from "assets/images/bg10.jpg";
import { Box } from "@mui/material";
import { Title } from "@mui/icons-material";

function Dashboard() {

    const [isdocumented, setIsDocumented] = useState(false);

    const [text, setText] = useState('');
    const [response, setResponse] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const onChange = (e) => {
        setText(e.target.value);
    }


    const submit = async (e) => {
        e.preventDefault();
        const result = await axios.post(`${process.env.REACT_APP_API_URI}/v1/analyse`, {
            text
        })

        if (result && result.data && result.data.response) {
            setResponse(result.data.response)
            const data = [

                { text: 'Positivity', value: result.data.response.sentitment.positive },
                { text: 'Negativity', value: Math.abs(result.data.response.sentitment.negative) },
                { text: 'Overall', value: result.data.response.sentitment.overall }

            ]
            setData(data)
            setIsDocumented(true);
        }
    }
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };


    return !isdocumented ? (
        <>
            <Navbar
                routes={routes}
                sticky
            />
            <MKBox component="section" py={12}>
                <Container>
                    <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
                        <MKTypography variant="h3" mb={1}>
                            Dashboard
                        </MKTypography>
                    </Grid>
                    <Grid container item xs={12} lg={7} sx={{ mx: "auto" }}>
                        <MKBox width="100%" >
                            <MKBox p={3}>
                                <Grid container spacing={3}>

                                    <Grid item xs={12}>
                                        <MKInput variant="standard" label="Legal Text" multiline fullWidth rows={20} onChange={onChange} />
                                    </Grid>

                                </Grid>
                                <Grid container item justifyContent="center" xs={12} my={2}>
                                    <MKButton variant="gradient" color="dark" fullWidth type="submit" onPress={submit} onClick={submit}>
                                        Submit
                                    </MKButton>
                                </Grid>
                            </MKBox>
                        </MKBox>
                    </Grid>
                </Container>
            </MKBox>


        </>
    ) : (<>

        <Navbar
            routes={routes}
            sticky
        />
        <MKBox component="section" py={12}>

            <Container>

                {response && response.relevants && response.relevants.main ? <SimpleInfoCard
                    icon="payments"
                    title="Summary"
                    description={response.relevants.main.map((data) => data)} /> : <></>
                }
                {
                    response && response.relevants && response.relevants.tags ? (<Stack direction="row" flexWrap="wrap" alignItems="flex-start" spacing={0.5} mt={2} mb={2} margin={2}>
                        {
                            response.relevants.tags.map((data) => {
                                return <MKBadge badgeContent={data} color="primary" container style={{ marginTop: '0.2rem' }} />
                            })
                        }

                    </Stack>) : (<></>)

                }
                <br></br>
                <hr></hr>
                <Title>Entities</Title>
                {
                    response && response.entiites ? (<Stack direction="row" flexWrap="wrap" alignItems="flex-start" spacing={0.5} mt={2} mb={2} margin={2}>
                        {
                            response.entiites.map((data) => {
                                return <MKBadge badgeContent={data} color="success" container style={{ marginTop: '0.2rem' }} />
                            })
                        }

                    </Stack>) : (<></>)

                }
                {
                    data ?
                        <Container>
                            <Box width="100%" justifyContent="center" alignItems="center" alignSelf="center">
                                <BarChart ylabel='Scale'
                                    width={500}
                                    height={500}
                                    margin={margin}
                                    data={data}

                                />
                            </Box>
                        </Container> : <></>
                }
            </Container>
        </MKBox>

    </>);
}

export default Dashboard;
