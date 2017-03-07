/**
 * Created by hobl on 07.03.17.
 */

import pagination from 'pagination';

export default function (prelink, current, totalResult) {
  var paginator = pagination.create('search', {prelink , current: current, rowsPerPage: 20, totalResult});
  document.getElementById("paging").innerHTML = paginator.render();
}
