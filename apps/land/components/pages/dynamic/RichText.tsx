"use client";
import React from "react";
import { serializeRichText } from "@/helpers/serializeRichText";

export default function RichText({ data }: any) {

    return (
        <section className="mx-3 mb-28 mt-16 flex flex-col gap-9 px-6 lg:mx-9 xl:mx-16 2xl:mx-44">
            {serializeRichText(data.content)}
        </section>
    );
}
