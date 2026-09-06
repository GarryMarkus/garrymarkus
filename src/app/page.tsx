import { Metadata } from "next";
import BackendVisual from "@/components/BackendVisual";

export const metadata: Metadata = {
  title: "Prem Singh",
};

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center min-h-[80vh] animate-page-enter">
      <BackendVisual />
    </div>
  );
}
