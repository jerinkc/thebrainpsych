require 'net/http'

class Elevenlabs
  VOICE_ID = "JBFqnCBsd6RMkjVDRZzb"
  URL = "https://api.elevenlabs.io/v1/text-to-speech/#{VOICE_ID}"

  def initialize(text)
    @text = text
  end

  def request
    eleven_request.body = { text: @text }.to_json

    http.request(eleven_request)
  end

  private

  def http
    url = URI(URL)
    http = Net::HTTP.new(url.host, url.port).tap do |h|
              h.use_ssl = true
           end
  end

  def eleven_request
    @req ||= Net::HTTP::Post.new(URL).tap do |req|
                req["xi-api-key"] = Rails.application.credentials.elevenlabs_api_key
                req["Content-Type"] = "application/json"
             end
  end
end
