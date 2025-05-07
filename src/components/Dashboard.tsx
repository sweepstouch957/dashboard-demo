"use client";

import { useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectItem } from "@/components/ui/select";
import {  SummaryItem } from "@/models/Campaing";

// Datos importados de múltiples tiendas
import { CampaignData, campaigns as storeData } from "@/data/analitycs"; // contiene el array de campañas que me pasaste

const dataSources: Record<string, CampaignData> = storeData.reduce((acc, store) => {
  const key = store.store.toLowerCase().replace(/[^a-z0-9]/gi, "_");
  acc[key] = store;
  return acc;
}, {} as Record<string, CampaignData>);

const storeKeys = Object.keys(dataSources);

export default function CampaignDashboard() {
  const [campaignKey, setCampaignKey] = useState<string>(storeKeys[0]);

  const data = dataSources[campaignKey];

  const summary: SummaryItem[] = [
    { id: "Enviados", value: data.totalSent },
    { id: "Entregados", value: data.totalDelivered },
    { id: "Errores", value: data.totalErrors },
  ];

  return (
    <div className="p-8 space-y-10 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <h1 className="text-3xl font-bold text-black">📊 Dashboard de Campañas</h1>

        <Select
          value={campaignKey}
          onValueChange={(value) => setCampaignKey(value)}
        >
          {storeKeys.map((key) => (
            <SelectItem key={key} value={key}>
              {dataSources[key].store}
            </SelectItem>
          ))}
        </Select>
      </div>
          
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500 text-sm mb-1">Total Mensajes</p>
            <p className="text-2xl font-semibold">{data.totalMessages}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500 text-sm mb-1">Enviados</p>
            <p className="text-2xl font-semibold">{data.totalSent}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500 text-sm mb-1">Entregados</p>
            <p className="text-2xl font-semibold">{data.totalDelivered}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500 text-sm mb-1 text-red">Errores</p>
            <p className="text-2xl font-semibold">{data.totalErrors}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-500 text-sm mb-1">Costo Total</p>
            <p className="text-2xl font-semibold mb-1">
              {parseFloat(data.totalCost).toFixed(2)} {data.currency}
            </p>
            <p className="text-gray-500 text-sm mb-1">Fecha</p>
            <p className="text-2xl font-semibold">{data.date}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="h-96 p-6">
            <ResponsivePie
              data={summary}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
              colors={({ id }) => {
                if (id === "Errores") return "#FF4B4B";
                if (id === "Entregados") return "#00C49F";
                if (id === "Enviados") return "#0088FE";
                return "#ccc";
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="h-96 p-6">
            <ResponsiveBar
              data={summary}
              keys={["value"]}
              indexBy="id"
              margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: "set2" }}
              axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
              axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}