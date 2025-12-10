Rails.application.routes.draw do
  resources :text_to_speech, only: [] do
    collection do
      post :get_voice
    end
  end
end
