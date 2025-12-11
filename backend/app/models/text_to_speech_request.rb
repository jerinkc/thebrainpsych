class TextToSpeechRequest < ApplicationRecord
  enum status: { pending: 0, converting: 2, uploading: 3, complete: 1 }

  has_one_attached :audio
  validates :text, presence: true
  validates :text, length: { minimum: 2, maximum: 100 }
end
