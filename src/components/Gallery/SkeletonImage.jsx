import styles from "./Gallery.module.scss";

const SkeletonImage = () => {
  return (
    <div className={styles["skeleton-image"]}>
      <div className={styles.image}></div>
    </div>
  );
};

export default SkeletonImage;
