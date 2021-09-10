import { ENTER, SPACE } from '../../utils/keycodes';
import callAll from '../../utils/callAll';

const NOOP = () => {};

function useButton({
  onClick = NOOP,
  onKeyDown = NOOP,
  onMouseDown = NOOP,
  type = 'button',
  ...rest
}) {
  return {
    buttonProps: {
      ...rest,
      onMouseDown: callAll(onClick, onMouseDown),
      onKeyDown: function(evt) {
        console.log('onKeyDown', evt.keyCode)
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
