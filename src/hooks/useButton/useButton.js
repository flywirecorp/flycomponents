import { ENTER, SPACE } from '../../utils/keycodes';
import callAll from '../../utils/callAll';

const NOOP = () => {};

function useButton({
  className = 'Button',
  onClick = NOOP,
  onKeyDown = NOOP,
  onMouseDown = NOOP,
  type = 'button',
  ...rest
}) {
  return {
    buttonProps: {
      ...rest,
      className,
      onMouseDown: callAll(onClick, onMouseDown),
      onKeyDown: function(evt) {
        callAll(
          [ENTER, SPACE].includes(evt.keyCode) ? onClick(evt) : NOOP,
          onKeyDown(evt)
        );
      },
      type
    }
  };
}

export default useButton;
