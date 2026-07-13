"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CostTracker } from "@/components/cost-tracker/cost-tracker";
import { WeddingCountdown } from "@/components/countdown/wedding-countdown";
import { FadeIn } from "@/components/animations/animated";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";

export default function CostTrackerPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-8">
              <Badge variant="success" className="mb-4">
                <Wallet className="h-3 w-3 mr-1" />
                Budget vs Actual
              </Badge>
            </div>
          </FadeIn>

          <div className="mb-8">
            <WeddingCountdown />
          </div>

          <CostTracker />
        </div>
      </div>
      <Footer />
    </div>
  );
}
