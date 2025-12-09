class TextToSpeechController < ApplicationController
  def get_voice
    request = TextToSpeechRequest.new(text_convert_request_params)

    if request.save
      # TODO: initiate job
      render json: request
    else
      render json: { errors: request.errors }, status: :unprocessable_entity
    end
  end

  def status
    request = TextToSpeechRequest.find(params[:id])

    render json: {
      data: { queue_position: request.id - TextToSpeechService.current }
    }
  end

  private

  def request_params
    params.require(:voice_request).permit(:text)
  end
end
