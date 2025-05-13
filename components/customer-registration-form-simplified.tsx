"use client"

import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Define the form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  industry: z.string().optional(),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  taxCode: z.string().optional(),
  representative: z.string().min(2, {
    message: "Representative name must be at least 2 characters.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function CustomerRegistrationForm() {
  const t = useTranslations("registration")

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      email: "",
      industry: "",
      phone: "",
      taxCode: "",
      representative: "",
    },
  })

  // Handle form submission
  function onSubmit(data: FormValues) {
    console.log(data)
    // Process form submission
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Grid cho Email, Address, Phone, và Representative */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">* </span>
                      {t("customerName")}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t("enterCustomerName")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">* </span>
                      {t("address")}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t("enterAddress")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">* </span>
                      {t("email")}
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t("enterEmail")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">* </span>
                      {t("phoneNumber")}
                    </FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder={t("enterPhoneNumber")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tax Code */}
              <FormField
                control={form.control}
                name="taxCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("taxCode")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enterTaxCode")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Legal Representative */}
              <FormField
                control={form.control}
                name="representative"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">* </span>
                      {t("legalRepresentative")}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={t("enterLegalRepresentative")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Industry đứng riêng và chiếm toàn bộ chiều rộng */}
          <div className="mt-6">
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("industry")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("enterIndustry")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  )
} 