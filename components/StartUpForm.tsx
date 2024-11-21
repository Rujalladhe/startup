"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <form
        action={formAction}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl"
      >
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <Input
            id="title"
            name="title"
            className="startup-form_input"
            required
            placeholder="Startup Title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div className="mt-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            className="startup-form_textarea"
            required
            placeholder="Startup Description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div className="mt-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-2"
          >
            Category
          </label>
          <Input
            id="category"
            name="category"
            className="startup-form_input"
            required
            placeholder="Startup Category (Tech, Health, Education...)"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div className="mt-4">
          <label
            htmlFor="link"
            className="block text-gray-700 font-medium mb-2"
          >
            Image URL
          </label>
          <Input
            id="link"
            name="link"
            className="startup-form_input"
            required
            placeholder="Startup Image URL"
          />
          {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
        </div>

        <div className="mt-4">
          <label htmlFor="pitch" className="block text-gray-700 font-medium mb-2">
            Pitch
          </label>
          <div data-color-mode="light">
            <MDEditor
              value={pitch}
              onChange={(value) => setPitch(value as string)}
              id="pitch"
              preview="edit"
              height={300}
              style={{ borderRadius: 10, overflow: "hidden" }}
              textareaProps={{
                placeholder:
                  "Briefly describe your idea and what problem it solves",
              }}
              previewOptions={{
                disallowedElements: ["style"],
              }}
            />
          </div>
          {errors.pitch && <p className="text-red-500 text-sm mt-1">{errors.pitch}</p>}
        </div>

        <Button
          type="submit"
          className="startup-form_btn bg-blue-600 hover:bg-blue-700 text-white mt-6 w-full flex items-center justify-center"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit Your Pitch"}
          <Send className="ml-2 w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default StartupForm;
