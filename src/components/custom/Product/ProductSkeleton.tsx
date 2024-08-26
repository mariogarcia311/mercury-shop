import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart } from "lucide-react";
import React from "react";

type Props = {};

export const ProductSkeleton = (props: Props) => {
  return (
    <Card className="bg-background border-primary/20">
      <CardContent className="p-4">
        <div className="w-full flex justify-center">
          <Skeleton className="h-48 w-48 mb-4 bg-skeleton" />
        </div>

        <Skeleton className="text-[16px] font-semibold mb-2 text-skeleton bg-skeleton truncated-text ">
          &nbsp;
        </Skeleton>
        <Skeleton className="text-[16px]font-semibold mb-2 text-skeleton bg-skeleton truncated-text">
          &nbsp;
        </Skeleton>

        <Skeleton className="text-skeleton mb-4 w-[50%] ">&nbsp;</Skeleton>

        <div className="flex justify-between items-center">
          <Skeleton className="text-xl font-bold text-secondary w-[50%] ">
            &nbsp;
          </Skeleton>
          <Skeleton className="text-skeleton">
            <Button size="sm" className="opacity-0">
              <span className="mr-2">Agregar</span>{" "}
              <ShoppingCart className="h-6 w-6" />
            </Button>
          </Skeleton>
        </div>
      </CardContent>
    </Card>
  );
};
