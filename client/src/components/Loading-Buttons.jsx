import { BeatLoader  } from "react-spinners";

export default function LoadingButton({ isLoading, children, ...props }) {
  return (
    <button {...props} disabled={isLoading || props.disabled}>
      {isLoading ? <BeatLoader  size={5} color="#fff" /> : children}
    </button>
  );
}
