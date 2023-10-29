const convertAddressToGoogleMapsUrl = address => {
  // Xử lý địa chỉ để loại bỏ khoảng trắng và thay thế dấu cách bằng dấu "+"
  const formattedAddress = address.replace(/\s+/g, '+');

  // Tạo URL cho Google Maps với địa chỉ đã được định dạng
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;

  return googleMapsUrl;
};

export default convertAddressToGoogleMapsUrl;
