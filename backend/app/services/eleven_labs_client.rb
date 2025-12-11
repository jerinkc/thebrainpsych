require 'net/http'

class ElevenLabsClient
  DEFAULT_VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"
  BASE_URL = "https://api.elevenlabs.io/v1/text-to-speech"

  class ApiError < StandardError; end

  def initialize(text, voice_id: DEFAULT_VOICE_ID)
    @text = text
    @voice_id = voice_id
  end

  def request
    response = http.request(build_request)

    if response.code != "200"
      raise ApiError, "ElevenLabs API Error: #{response}"
    end

    response
  end

  private

  def url
    URI("#{BASE_URL}/#{@voice_id}")
  end

  def http
    Net::HTTP.new(url.host, url.port).tap do |h|
      h.use_ssl = true
    end
  end

  def build_request
    Net::HTTP::Post.new(url).tap do |req|
      req["xi-api-key"] = Rails.application.credentials.elevenlabs_api_key
      req["Content-Type"] = "application/json"
      req.body = { text: @text }.to_json
    end
  end
end
