import { motion } from "framer-motion";

const Divider = ({ theme }) => {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        borderBottom: `1px solid ${theme.border}`,
        margin: "3rem 0",
      }}
    />
  );
};

export default Divider;
