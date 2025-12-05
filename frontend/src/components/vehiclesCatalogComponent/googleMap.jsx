/* eslint-disable react/prop-types */
const GoogleMap = ({ radius, height }) => {
  return (
    <div className="w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.6106435903744!2d7.698686375906178!3d47.28126121038778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4791d359e89e6523%3A0x73e8321da86a3953!2sACN%20Autocenter%20Niederbipp%20AG!5e1!3m2!1sen!2s!4v1740657039182!5m2!1sen!2s"
        width="600"
        height={`${height ? height : "450"}`}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={`w-full ${radius ? radius : ""}`}
      ></iframe>
    </div>
  );
};
export default GoogleMap;
