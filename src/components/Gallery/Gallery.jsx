import styles from "./Gallery.module.scss";

const Gallery = ({ images }) => {
  return (
    <>
      {images?.map((image) => (
        <div key={image.id} className={styles.item}>
          <img src={image.webformatURL} alt={image.tags} className={styles.image} />
          <div className={styles.overlay}>
            <p className={styles.tags}>{image.tags}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Gallery;
