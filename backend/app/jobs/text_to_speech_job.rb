class TextToSpeechJob < ApplicationJob
  queue_as :default

  retry_on ElevenLabsClient::ApiError, wait: :exponentially_longer, attempts: 3

  def perform(request)
    TextToSpeechService.new(request)
                       .convert_to_audio!
    request.complete!
  end
end
