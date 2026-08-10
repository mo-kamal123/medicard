import { z } from "zod"

export const createPhoneSchema = (t) =>
  z.string().superRefine((value, ctx) => {
    if (!value) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: t("common.phoneRequired") })
      return
    }
    if (!/^\d+$/.test(value)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: t("common.phoneDigitsOnly") })
      return
    }
    if (value.length !== 11 && value.length !== 10) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: t("common.phoneLength") })
      return
    }
    if (!/^1[0125]/.test(value.replace(/^0/, ""))) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: t("common.phoneInvalid") })
      return
    }
  })
