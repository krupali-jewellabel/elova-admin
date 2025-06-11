import { Button } from "@/components/common/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/cards/card";
import { Input, InputWrapper } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { ImageIcon, SquareMousePointer } from "lucide-react";
import Link from "next/link";
import React from "react";

const Branding = () => {
  return (
    <Card className="pb-2.5 w-full h-full justify-center">
      <div className="text-center mb-[32px] text-xl font-medium leading-none">
        Branding & Logo
      </div>
      <div className="grid gap-5 lg:gap-7.5 xl:w-[38.75rem] w-full mx-auto">
        <CardContent className="grid gap-5">
          <div className="flex flex-wrap justify-between gap-5">
            <div className="flex flex-col">
              <div className="text-mono text-sm font-medium">Company Logo</div>
              <span className="text-secondary-foreground text-sm">
                Emblematic Corporate Identity Symbol
              </span>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-5 lg:gap-7.5 max-w-96 w-full">
              <div className="flex bg-center w-full p-5 lg:p-7 bg-no-repeat bg-[length:550px] border border-input rounded-xl border-dashed branding-bg">
                <div className="flex flex-col place-items-center place-content-center text-center rounded-xl w-full">
                  <div className="flex items-center mb-2.5">
                    <div className="relative size-11 shrink-0">
                      <svg
                        className="w-full h-full stroke-orange-200 fill-white dark:stroke-orange-950 dark:fill-orange-950/30"
                        width="44"
                        height="48"
                        viewBox="0 0 44 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
                            18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
                            39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
                          fill=""
                        />

                        <path
                          d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
                            18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
                            39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
                          stroke=""
                          strokeOpacity="0.2"
                        />
                      </svg>
                      <div className="absolute leading-none left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4">
                        <ImageIcon className="text-xl ps-px text-orange-400" />
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/network/user-cards/mini-cards"
                    className="text-mono text-xs font-medium hover:text-primary-active mb-px"
                  >
                    Click or Drag & Drop
                  </Link>
                  <span className="text-xs text-secondary-foreground text-nowrap">
                    SVG,PNG, JPG (max. 800x400)
                  </span>
                </div>
              </div>
              <img
                src={"/app/hexlab.png"}
                className="h-[35px] mt-2"
                alt="image"
              />
            </div>
          </div>
          <div className="flex flex-col items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full">Brand Color</Label>
            <div className="flex w-full justify-between gap-5">
              <div className="flex flex-col">
                <div className="text-mono text-sm font-medium">
                  Primary Color
                </div>
                <span className="text-secondary-foreground text-sm">
                  Signature Palette Branding Element
                </span>
              </div>
              <InputWrapper className="w-52">
                <Button variant="dim" mode="icon" className="-me-2">
                  <SquareMousePointer size={16} className="text-green-500" />
                </Button>
                <Input
                  type="text"
                  //   value={keyInput}
                  //   onChange={(e) => setKeyInput(e.target.value)}
                />
              </InputWrapper>
            </div>
            <div className="flex w-full justify-between gap-5">
              <div className="flex flex-col">
                <div className="text-mono text-sm font-medium">
                  Secondary Color
                </div>
                <span className="text-secondary-foreground text-sm">
                  Signature Palette Branding Element
                </span>
              </div>
              <InputWrapper className="w-52">
                <Button variant="dim" mode="icon" className="-me-2">
                  <SquareMousePointer size={16} className="text-green-500" />
                </Button>
                <Input
                  type="text"
                  //   value={keyInput}
                  //   onChange={(e) => setKeyInput(e.target.value)}
                />
              </InputWrapper>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <Label className="flex w-full items-center gap-1">
                Font Style
              </Label>
              <Select defaultValue="1">
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">
                    Modern / Elegant / Playful / Custom
                  </SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                  <SelectItem value="3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <Label className="flex w-full items-center gap-1">
                Tone of Voice
              </Label>
              <Select defaultValue="1">
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">
                    Modern / Elegant / Playful / Custom
                  </SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                  <SelectItem value="3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full">Tagline or Slogan (Optional)</Label>
            <Input
              type="text"
              // value={emailInput}
              // onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Tagline or Slogan"
            />
          </div>
          <div className="flex flex-col items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full">
              Contact Number (WhatsApp Preferred)
            </Label>
            <Input
              type="text"
              // value={addressInput}
              // onChange={(e) => setAddressInput(e.target.value)}
              placeholder="Contact Number"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3 mt-10">
            <Button variant="ghost">Save Draft</Button>
            <Button variant="outline">Previous</Button>
            <Button>Next</Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default Branding;
