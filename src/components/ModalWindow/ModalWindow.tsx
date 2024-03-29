import { ReactNode } from "react";

import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

interface IProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
  isOpenModal: boolean;
}

const ModalWindow: React.FC<IProps> = ({
  children,
  title,
  onClose,
  isOpenModal,
}) => {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="modal-window"
      open={isOpenModal}
      maxWidth={false}
    >
      <DialogTitle
        sx={{
          color: "#5C5E60",
          fontSize: 20,
          textAlign: "center",
          p: 3,
        }}
        id="modal-window-title"
      >
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 18,
          top: 18,
          "&:hover": {
            backgroundColor: "#f8f0fb",
          },
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{
          p: "0 24px 24px",
          width: 630,
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalWindow;
