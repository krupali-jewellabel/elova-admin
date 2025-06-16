"use client";

import { Card, CardContent, CardFooter } from "./card";
import { AvatarSingle } from "@/components/common/ui/avatar-single";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../button";

export const CardAuthor = ({ avatar, bgImage, name, location, works, theme }) => {
  const dashedCardClass = "bg-white border-2 border-dashed border-gray-300";
  const avatarImageClass = cn("bg-white", avatar?.imageClass);

  return (
    <Card className="max-w-full mx-auto overflow-hidden">
      <div
        className="relative h-[230px] w-full bg-cover bg-top"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4">
            <AvatarSingle
              className={avatar?.className}
              image={avatar?.image}
              imageClass={avatarImageClass}
              badgeClass={avatar?.badgeClass}
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Link
                  href="#"
                  className="text-lg font-semibold text-foreground hover:text-primary-active"
                >
                  {name}
                </Link>
                <span className="inline-flex items-center justify-center rounded-full bg-red-50 p-1">
                  <img src="/images/verify.svg" alt="Verified" />
                </span>
              </div>
              <span className="text-muted-foreground text-sm max-w-[400px]">{location}</span>
            </div>
          </div>

          {/* Works Grid */}
          {works?.length > 0 && (
            <>
              <div className="grid grid-cols-4 gap-5 w-full pt-2">
                {works.map((work) => (
                  <div
                    key={work.id}
                    className="relative aspect-[1/0.75] bg-muted/5 rounded-lg group cursor-pointer"
                  >
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-[180px] object-cover"
                    />
                    {/* <div className="absolute bottom-0 left-0 right-0 p-2 text-start bg-white/95 transition duration-300 group-hover:bg-white">
                      <span className="text-sm font-medium text-foreground">{work.title}</span>
                    </div> */}
                    <CardFooter className="justify-start absolute bottom-[-32] left-0 right-0 border border-gray-300 rounded-b-lg">
                      <Button mode="link">
                        <span className="text-sm font-medium text-foreground">{work.title}</span>
                      </Button>
                    </CardFooter>
                  </div>
                ))}
              </div>

              {/* Theme Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-6">
                <ThemeCard title="Visual Mood & Style" content={theme?.visualStyle || "Smooth, luxurious, understated"} />
                <ThemeCard title="Theme Personality" content={theme?.personality || "Deep burgundy, gold, cream, black"} />
                <ThemeCard title="Recommended Styling" content={theme?.recommendedStyle || "Sophisticated serif with high contrast strokes"} />
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        
          <Button mode="link" underlined="dashed" className="text-xl" asChild>
            <Link href="#">Preview Live Demo</Link>
          </Button>
    
      </CardFooter>
    </Card>
  );
};

// Extracted reusable component for theme info cards
const ThemeCard = ({ title, content }) => (
  <Card className="bg-white border-2 border-dashed border-gray-300">
    <CardContent className="p-5">
      <h3 className="font-semibold text-base mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{content}</p>
    </CardContent>
  </Card>
);
