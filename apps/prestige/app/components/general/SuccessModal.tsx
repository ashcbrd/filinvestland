import { Box, Modal, Stack } from "@mui/material";
import { Typography } from "../typography/typography";
import Button from "./button";

export const MessageSent = () => {
  return (
    <svg
      width="82"
      height="88"
      viewBox="0 0 82 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="40.9993"
        cy="41.1999"
        r="39.3079"
        fill="white"
        stroke="#A0672D"
        stroke-width="3"
      />
      <g clip-path="url(#clip0_1904_2079)">
        <path
          d="M54.9014 40.9025C54.4499 40.9025 54.0836 40.5361 54.0836 40.0847V25.6592C54.0836 24.3066 52.9829 23.2059 51.6303 23.2059H30.3682C29.0156 23.2059 27.9148 24.3066 27.9148 25.6592V40.0847C27.9148 40.5361 27.5485 40.9025 27.0971 40.9025C26.6457 40.9025 26.2793 40.5377 26.2793 40.0847V25.6592C26.2793 23.4054 28.1127 21.5703 30.3682 21.5703H51.6303C53.8857 21.5703 55.7191 23.4054 55.7191 25.6592V40.0847C55.7191 40.5377 55.3528 40.9025 54.9014 40.9025Z"
          fill="#494949"
        />
        <path
          d="M40.9995 47.7307C40.3502 47.7307 39.7009 47.5753 39.1088 47.2662L21.8129 38.2429C21.4122 38.0335 21.2569 37.5396 21.4662 37.1389C21.6756 36.7365 22.1728 36.5844 22.5702 36.7921L39.8661 45.8155C40.5759 46.1884 41.4248 46.1867 42.1346 45.8155L59.4305 36.7905C59.8296 36.5828 60.3251 36.7349 60.5345 37.1372C60.7439 37.538 60.5885 38.0319 60.1878 38.2412L42.8919 47.2645C42.2982 47.5753 41.6488 47.7307 40.9995 47.7307Z"
          fill="#494949"
        />
        <path
          d="M57.3551 59.1893H24.6441C22.8401 59.1893 21.373 57.7222 21.373 55.9182V35.3267C21.373 34.1017 22.0485 32.9895 23.1378 32.4252L26.7196 30.5607C27.1154 30.353 27.6127 30.5067 27.822 30.9074C28.0314 31.3098 27.876 31.8021 27.4736 32.0114L23.8918 33.876C23.3472 34.1589 23.0086 34.715 23.0086 35.3267V55.9182C23.0086 56.8194 23.7413 57.5538 24.6441 57.5538H57.3551C58.2579 57.5538 58.9906 56.8194 58.9906 55.9182V35.3267C58.9906 34.715 58.652 34.1605 58.1074 33.8776L54.5256 32.0114C54.1249 31.8037 53.9678 31.3098 54.1772 30.9091C54.3865 30.5084 54.8854 30.3563 55.2796 30.5623L58.8614 32.4269C59.9507 32.9895 60.6262 34.1017 60.6262 35.3267V55.9182C60.6262 57.7222 59.1591 59.1893 57.3551 59.1893Z"
          fill="#494949"
        />
        <path
          d="M33.6404 39.5645C33.4311 39.5645 33.2217 39.4844 33.0615 39.3257C32.7425 39.0068 32.7425 38.4883 33.0615 38.1694L38.7859 32.445C39.0328 32.1948 39.4139 32.1343 39.7296 32.2913L42.474 33.6635L47.7814 28.3561C48.1003 28.0372 48.6188 28.0372 48.9377 28.3561C49.2566 28.6751 49.2566 29.1935 48.9377 29.5125L43.2133 35.2369C42.9647 35.4871 42.5852 35.5476 42.2696 35.3906L39.5251 34.0184L34.2178 39.3257C34.0591 39.4844 33.8498 39.5645 33.6404 39.5645Z"
          fill="#494949"
        />
        <path
          d="M48.3592 34.6579C47.9078 34.6579 47.5414 34.2915 47.5414 33.8401V29.7513H43.4525C43.0011 29.7513 42.6348 29.3849 42.6348 28.9335C42.6348 28.4821 43.0011 28.1157 43.4525 28.1157H48.3592C48.8106 28.1157 49.1769 28.4821 49.1769 28.9335V33.8401C49.1769 34.2915 48.8106 34.6579 48.3592 34.6579Z"
          fill="#494949"
        />
      </g>
      <circle cx="60.6281" cy="75.6488" r="11.5812" fill="#22DE04" />
      <path d="M55.5977 75.5532L59.0145 78.97L65.6569 72.3276" stroke="white" />
      <defs>
        <clipPath id="clip0_1904_2079">
          <rect
            width="39.2531"
            height="39.2531"
            fill="white"
            transform="translate(21.373 21.5735)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const SuccessModal = ({ open, onClose }: any) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: 450, height: 450, p: 6 }}
        >
          <Stack
            direction="column"
            alignItems="center"
            gap={2}
            textAlign={"center"}
          >
            <MessageSent />
            <Typography
              text={"Your Message Was Sent Successfully"}
              color="dark"
              font="nunito"
              size="18"
              className="whitespace-pre-wrap"
            />
            <Typography
              text={
                "Your query has been sent. We will get in touch with you as soon we can. We're looking forward to talk with you."
              }
              color="dark"
              font="nunito"
              size="15"
              className="whitespace-pre-wrap"
            />
            <Button onClick={() => onClose()} label="Got it!" />
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
