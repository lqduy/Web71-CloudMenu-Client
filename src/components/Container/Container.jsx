import PropTypes from 'prop-types';
import classNames from 'classnames';

const Container = ({ children, className }) => {
  return (
    <div
      className={classNames('w-full 2xl:max-w-screen-2xl min-w-[1536px] lg:px-[5%] px-4 2xl:px-1 mx-auto', {
        [className]: className
      })}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Container;
