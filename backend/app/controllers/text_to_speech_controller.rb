class TextToSpeechController < ApplicationController
  def get_voice
    request = TextToSpeechRequest.new(request_params)

    if request.save
      TextToSpeechService.schedule(request)
      render json: { id: request.id, status: request.status }
    else
      render json: { errors: request.errors.full_messages.first }, status: :unprocessable_content
    end
  end

  def status
    request = TextToSpeechRequest.find(params[:text_to_speech_id])

    response_data = {
      id: request.id,
      status: request.status
    }

    if request.complete?
      response_data[:url] = request.audio.url
    end

    render json: response_data
  end

  private

  def request_params
    params.require(:voice_request).permit(:text)
  end
end
