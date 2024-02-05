"use client";
import React from "react";
import Link from "next/link";
import FadeDown from "@/components/animation/FadeDown";
import Fade from "@/components/animation/Fade";
import {
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
const AnnualCard = ({ item }: any) => {
  const content = item?.annualFinancialReport?.[0];

  return (
    <Card>
      <Link href={content?.file.url} target="_blank">
        <CardHeader
          avatar={
            <Chip
              label={item?.year}
              sx={{ bgcolor: "#012B72", color: "#fff" }}
            />
          }
          action={<IconButton aria-label="settings"></IconButton>}
          title={
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
            >
              {content?.annualFinancialReportTitle}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          image={content?.icon?.url}
          sx={{ aspectRatio: 1 / 1.2 }}
          alt={content?.annualFinancialReportTitle}
        />
      </Link>
    </Card>
  );
};

export default function AnnualReports({ content }: any) {
  const annualReportsBlock = content?.content?.find(
    (item: any) => item.blockType === "financial-highlights-annual-reports"
  );

  console.log(annualReportsBlock?.annualFinancialReports);

  return (
    <section className="mx-3 mb-28 mt-16 flex flex-col gap-9 px-6 lg:mx-9 xl:mx-16 2xl:mx-44">
      <FadeDown>
        <h2 className="text-4xl font-bold text-jet">
          {annualReportsBlock?.title}
        </h2>
      </FadeDown>
      <div className="mt-4 flex flex-col gap-16">
        <Grid
          container
          spacing={{
            xs: 2,
            sm: 3,
            md: 4,
            lg: 6,
          }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
        >
          {annualReportsBlock?.annualFinancialReports?.map(
            (item: any, index: number) => (
              <Grid item xs={12} sm={4} md={4} lg={4} xl={3} key={index}>
                <Fade>
                  <AnnualCard item={item} />
                </Fade>
              </Grid>
            )
          )}
        </Grid>
      </div>
    </section>
  );
}
