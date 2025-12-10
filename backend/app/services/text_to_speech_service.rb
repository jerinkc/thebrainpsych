class TextToSpeechService
  def initialize(request)
    @request = request
  end

  def convert_to_audio!
    elabs_response = Elevenlabs.new(@request.text)
                               .request

    if elabs_response.code == "200"
      @request.audio.attach(
        io: StringIO.new(elabs_response.body),
        filename: "voice_#{ @request.id }.mpeg",
        content_type: "audio/mpeg"
      )
    else
      Rails.logger.error("ElevenLabs API Error: #{ elabs_response.body }")
      raise "ElevenLabs API Error: #{ elabs_response.code } - #{ elabs_response.body }"
    end
  end

  def self.schedule(text_to_speech_request)
    TextToSpeechJob.perform_later(text_to_speech_request)
  end
end
