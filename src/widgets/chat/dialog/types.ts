import { IHeader } from "@/entites/chat/header/types";

export interface DialogProps extends IHeader {
  dialogId: string | null
}