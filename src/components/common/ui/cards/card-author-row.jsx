"use client";

import { Card, CardContent, CardFooter } from './card';
import { AvatarSingle } from '@/components/common/ui/avatar-single';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

export const CardAuthorRow = ({ avatar, bgImage, name, location, works }) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-5">
        <AvatarSingle
          className={avatar?.className}
          image={avatar?.image}
          imageClass={avatar?.imageClass}
          badgeClass={avatar?.badgeClass}
        />
        <div className="flex flex-col gap-1.5">
          <Link
            href="#"
            className="hover:text-primary-active text-base leading-5 font-medium text-mono"
          >
            {name}
          </Link>
          <span className="flex items-center text-secondary-foreground text-sm">
            <MapPin size={16} className="me-1.5 text-md text-muted-foreground" />
            {location}
          </span>
        </div>
        {works && works.length > 0 && (
          <div className="flex gap-4 ml-auto">
            {works.slice(0, 4).map((work, index) => (
              <div key={work.id} className="relative h-[80px] w-[80px] bg-muted/10 rounded-lg overflow-hidden group hover:shadow-md transition-all">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-contain p-3"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-white text-xs font-medium truncate">{work.title}</span>
                </div>
              </div>
            ))}
            {works.length > 4 && (
              <div className="flex items-center justify-center text-muted-foreground font-medium text-sm">
                +{works.length - 4}
              </div>
            )}
          </div>
        )}
      </CardContent>
          
    </Card>
  );
};
