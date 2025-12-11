class TextToSpeechService
  LAST_EXECUTED_TEXT_TO_SPEECH_KEY = "last_request_executed_key"

  def initialize(request)
    @request = request
  end

  def convert_to_audio!
    @request.converting!
    response = ElevenLabsClient.new(@request.text).request

    @request.uploading!
    @request.audio.attach(
      io: StringIO.new(response.body),
      filename: "voice_#{ @request.id }.mpeg",
      content_type: "audio/mpeg"
    )
  end

  def self.schedule(text_to_speech_request)
    TextToSpeechJob.perform_now(text_to_speech_request)
  end
end
