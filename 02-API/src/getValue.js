/**
 * Created by hobl on 07.03.17.
 */

export default function (ctx) {
  let [key, val] = ctx.querystring.split('=');

  if(val)
    return val;

  return 1;
}
