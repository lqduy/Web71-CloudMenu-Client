const CartItem = ({ id, name, image, quantity }) => {
  return (
    <div className=' gap-5 grid grid-cols-3 '>
      <h2>{name}</h2>
      <img className='w-16' src={image} alt={name} />
      <h3>{quantity}</h3>
    </div>
  );
};

export default CartItem;
