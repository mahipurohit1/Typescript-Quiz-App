import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface data {
  open: boolean;
  handleClose: () => void;
  score: number;
  total: number;
}

const Score: React.FC<data> = (props) => {
  return (
    <div>
      <Modal
        keepMounted
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Congratulation !! you Successfully completed Quiz 🎉
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            you scored <strong>{props.score}</strong> marks out of {props.total}{" "}
            !!!
          </Typography>
          <br />
          <Button onClick={props.handleClose} variant="outlined">
            Next Quiz
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Score;
