import { Header, Messages } from "@/entites/chat"
import { CreateMessage } from "@features/index"
import { DialogProps } from "./types"


export const Dialog: React.FC<DialogProps> = ({ currentDialogUser, dialogId }) => {
  if (!currentDialogUser) {
    return (
      <></>
    )
  }
  return (

    <>
      <Header currentDialogUser={currentDialogUser} />
      <Messages currentDialogUser={currentDialogUser} />
      <CreateMessage currentDialogUser={currentDialogUser} dialogId={dialogId} />
    </>
  )
}

