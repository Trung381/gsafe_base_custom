"use client"

import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { forwardRef, useImperativeHandle, useEffect } from "react"

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

export type CustomerFormValues = z.infer<typeof formSchema>

interface CustomerRegistrationFormProps {
  data?: Partial<CustomerFormValues>;
  setData?: (data: CustomerFormValues) => void;
}

const CustomerRegistrationForm = forwardRef<{ validate: () => Promise<boolean> }, CustomerRegistrationFormProps>(
  ({ data = {}, setData }, ref) => {
    const t = useTranslations("registration")

    const form = useForm<CustomerFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: data.name || "",
        address: data.address || "",
        email: data.email || "",
        industry: data.industry || "",
        phone: data.phone || "",
        taxCode: data.taxCode || "",
        representative: data.representative || "",
      },
      mode: "onChange", // Enable live validation
    })

    // Expose the validate method to the parent component
    useImperativeHandle(ref, () => ({
      validate: async () => {
        const result = await form.trigger();
        if (result && setData) {
          const values = form.getValues();
          setData(values);
        }
        return result;
      }
    }));

    // Update form when external data changes
    useEffect(() => {
      if (data && Object.keys(data).length > 0) {
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined) {
            form.setValue(key as keyof CustomerFormValues, value as any);
          }
        });
      }
    }, [data, form]);

    // Handle form submission
    function onSubmit(values: CustomerFormValues) {
      if (setData) {
        setData(values);
      }
      console.log(values);
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
)

CustomerRegistrationForm.displayName = "CustomerRegistrationForm";

export default CustomerRegistrationForm; 