import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@src/shadcn/ui/alert-dialog"
import { Button } from "@src/shadcn/ui/button"
import { ToolBarComponent } from "@interface/ToolbarComponent.interface"
import { useState } from "react"
import MonacoEditor from "@components/MonacoEdito"


export default function Toolbar({ query }) {
  const [code, setCode] = useState();

  function handleSendCode(sql: string) {
    query(sql)
  }

  return (

    <div className="flex items-center justify-between p-4">
      <h3>
      </h3>
      <span className="text-lg italic mx-4">
      </span>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">SQL Editor </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="w-[95vw] h-[95vh] max-w-none max-h-none">
          <MonacoEditor
            value={code}
            language="javascript"
            onChange={setCode}
          />

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleSendCode(code)}>Exec SQL Query</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

