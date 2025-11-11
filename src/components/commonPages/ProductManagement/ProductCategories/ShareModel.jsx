import { Button } from "@/components/common/ui/button";
import DialogContent, {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/common/ui/dialog";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import { Separator } from "@/components/common/ui/separator";
import { Switch } from "@/components/common/ui/switch";
import {
  Download,
  FileText,
  LinkIcon,
  Mail,
  MessageSquare,
} from "lucide-react";
import React from "react";

const ShareModel = ({
  showShareModal,
  setShowShareModal,
  shareOptions,
  setShareOptions,
  handleGenerateShare,
}) => {
  return (
    <div>
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="max-w-2xl rounded-xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Share Products</DialogTitle>
            <DialogDescription>
              Choose what information to include and how to share
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Share Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="images-only" className="text-sm">
                  Images Only
                </Label>
                <Switch
                  id="images-only"
                  checked={shareOptions.imagesOnly}
                  onCheckedChange={(checked) =>
                    setShareOptions((prev) => ({
                      ...prev,
                      imagesOnly: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="images-title" className="text-sm">
                  Images + Title
                </Label>
                <Switch
                  id="images-title"
                  checked={shareOptions.imagesWithTitle}
                  onCheckedChange={(checked) =>
                    setShareOptions((prev) => ({
                      ...prev,
                      imagesWithTitle: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="include-price" className="text-sm">
                  Include Price
                </Label>
                <Switch
                  id="include-price"
                  checked={shareOptions.includePrice}
                  onCheckedChange={(checked) =>
                    setShareOptions((prev) => ({
                      ...prev,
                      includePrice: checked,
                    }))
                  }
                />
              </div>

              {shareOptions.includePrice && (
                <Input
                  placeholder="Custom price (optional)"
                  value={shareOptions.customPrice}
                  onChange={(e) =>
                    setShareOptions((prev) => ({
                      ...prev,
                      customPrice: e.target.value,
                    }))
                  }
                  className="rounded-xl"
                />
              )}

              <div className="flex items-center justify-between">
                <Label htmlFor="include-desc" className="text-sm">
                  Include Description
                </Label>
                <Switch
                  id="include-desc"
                  checked={shareOptions.includeDescription}
                  onCheckedChange={(checked) =>
                    setShareOptions((prev) => ({
                      ...prev,
                      includeDescription: checked,
                    }))
                  }
                />
              </div>
            </div>

            <Separator />

            {/* Share Output Options */}
            <div className="space-y-3">
              <Label className="text-sm">Share As</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button variant="outline" className="rounded-xl gap-2">
                  <LinkIcon className="w-4 h-4" />
                  Link
                </Button>
                <Button variant="outline" className="rounded-xl gap-2">
                  <FileText className="w-4 h-4" />
                  PDF
                </Button>
                <Button variant="outline" className="rounded-xl gap-2">
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="rounded-xl gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerateShare}
              className="w-full rounded-xl bg-[#C2A676] hover:bg-[#B89660] text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Generate & Share
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShareModel;
