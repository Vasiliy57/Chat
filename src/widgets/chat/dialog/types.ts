import { IHeader } from "@/entites/chat/header/types";

export interface DialogProps extends IHeader {
  myUserId: string | null
}