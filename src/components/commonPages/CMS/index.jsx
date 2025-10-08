import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/ui/tabs";
import StaticPageManager from "./StaticPages/StaticPageManager";
import BlogManager from "./BlogManager/BlogManager";
import FaqManager from "./FAQManager/FaqManager";

export default function CMS() {
  return (
    <div className="min-h-screen">
      <div>
        <div>
          <h1>Content Management System</h1>
          <p className="text-muted-foreground">
            Manage your website content from one place
          </p>
        </div>

        <Tabs defaultValue="static-pages" className="w-full mt-5">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="static-pages">Static Pages</TabsTrigger>
            <TabsTrigger value="blog">Blog Manager</TabsTrigger>
            <TabsTrigger value="faq">FAQ Manager</TabsTrigger>
          </TabsList>

          <TabsContent value="static-pages" className="mt-6">
            <StaticPageManager />
          </TabsContent>

          <TabsContent value="blog" className="mt-6">
            <BlogManager />
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <FaqManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
