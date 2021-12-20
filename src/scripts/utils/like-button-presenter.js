import Swal from 'sweetalert2';
import {
    createFavoriteButtonTemplate,
    createUnfavoriteButtonTemplate,
  } from '../views/templates/template-creator';
  
  const LikeButtonPresenter = {
    async init({ buttonLikeContainer, favorite, eventFavorite }) {
      this._buttonLikeContainer = buttonLikeContainer;
      this._eventFavorite = eventFavorite;
      this._favorite = favorite;

      await this._renderButton();
    },
  
    async _renderButton() {
      const { event_id, user_id, api_token } = this._eventFavorite;
      const data = {
        event_id:event_id,
        user_id:user_id
      }
      if (await this._isEventExist(event_id, user_id, api_token) != null) {
        this._renderLiked(api_token, event_id);
      } else {
        this._renderLike(api_token, data);
      }
    },
  
    async _isEventExist(event_id, user_id, apiToken) {
      const event = await this._favorite.getFavorite(event_id, apiToken);
      return event.data;
    },
  
    _renderLike(api_token, data) {
      this._buttonLikeContainer.innerHTML = createFavoriteButtonTemplate();
  
      const likeButton = document.querySelector('.btn-like');
      likeButton.addEventListener('click', async () => {
        const addFavorite = await this._favorite.addFavorite(api_token, data);
        if(addFavorite.status) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully added to favorite',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Something went wrong!`,
          });
        }
        this._renderButton();
      });
    },
  
    _renderLiked(api_token, event_id) {
      this._buttonLikeContainer.innerHTML = createUnfavoriteButtonTemplate();
  
      const likeButton = document.querySelector('.btn-like');
      likeButton.addEventListener('click', async () => {
        const deleteFavorite = await this._favorite.deleteFavorite(event_id, api_token);
        if(deleteFavorite.status) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully delete from favorite',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Something went wrong!`,
          });
        }
        this._renderButton();
      });
    },
  };
  
  export default LikeButtonPresenter;
  