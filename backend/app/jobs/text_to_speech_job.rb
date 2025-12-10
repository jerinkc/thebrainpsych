class TextToSpeechJob < ApplicationJob
  queue_as :default

  def perform(request)
    TextToSpeechService.new(request)
                       .convert_to_audio!
    request.complete!
  end
end
