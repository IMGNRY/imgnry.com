import { random } from './tools'
import * as PIXI from 'pixi.js'

const PREF = {
  TARGET_ELEMENT_SELECTOR: '.night-sky-container',
  STAR_MAX_ALPHA_VELOCITY: 0.01,
  //   STAR_MAX_ALPHA_VELOCITY: 0.005,
  STAR_BIRTH_INTERVAL: 10,
  STAR_COUNT: 200,
  METEOR_VELOCITY: 35,
  METEOR_BIRTH_INTERVAL_RANGE: { MIN: 0, MAX: 5000 },
  METEOR_START_LENGTH_MOD: 10,
  //   TEXTURE_ASSETS_BASE_URL: 'https://res.cloudinary.com/picular/image/upload/night-sky-textures',
}

const texture = (filename: string) => {
  return PIXI.Texture.from(`/textures/${filename}`)
  //   return PIXI.Texture.from(`${PREF.TEXTURE_ASSETS_BASE_URL}/${filename}`)
}

// PIXI.settings.ANISOTROPIC_LEVEL = 16

window.addEventListener('DOMContentLoaded', async () => {
  const nightSkyContainer = document.querySelector(PREF.TARGET_ELEMENT_SELECTOR)
  const containerRect = nightSkyContainer.getBoundingClientRect()
  console.log('window.devicePixelRatio', window.devicePixelRatio)
  const app = new PIXI.Application({
    transparent: true,
    width: containerRect.width,
    height: containerRect.height,
    antialias: true,
    autoDensity: true,
  })
  nightSkyContainer.appendChild(app.view)
  app.renderer.plugins.interaction.autoPreventDefault = false
  app.renderer.view.style.touchAction = 'auto'

  // screen fx
  //   app.stage.filters = [
  //     new RGBSplitFilter(new PIXI.Point(-0.5, -0.5), new PIXI.Point(1, -0.5), new PIXI.Point(-1, 0.5)),
  //     new AdvancedBloomFilter({ threshold: 0.6, blur: 3, bloomScale: 4, brightness: 1 }),
  //   ]

  // fade in
  //   app.stage.alpha = 0
  // const starFieldBgDiv = document.querySelector('.starfield-background') as HTMLDivElement
  // const revealStarFieldBgDiv = () => {
  //     const opacity = Number(starFieldBgDiv.style.opacity)
  //     starFieldBgDiv.style.opacity = `${opacity + 0.005}`
  //     if (opacity < 1) {
  //         requestAnimationFrame(revealStarFieldBgDiv)
  //     }
  // }
  // requestAnimationFrame(revealStarFieldBgDiv)

  // react to windows resize
  window.addEventListener('resize', () => {
    const containerRect = nightSkyContainer.getBoundingClientRect()
    app.renderer.resize(containerRect.width, containerRect.height)

    const height = app.renderer.height
    cloud3.scale.set(height.remap([0, textureHeight], [0, 0.5]))
    // cloud4.scale.set(height.remap([0, textureHeight], [0, 0.8]))
    // cloud5.scale.set(height.remap([0, textureHeight], [0, 1]))

    const width = app.renderer.width
    cloud.width = width
    cloud2.width = width
    cloud3.width = width
    // cloud4.width = width
    // cloud5.width = width
  })

  const randomScreenX = () => Math.random().remap([0, 1], [0, app.renderer.width])
  const randomScreenY = () => Math.random().remap([0, 1], [0, app.renderer.height])

  // stars
  interface Star extends PIXI.Sprite {
    alphaVelocity: number
    // scaleMax: number
  }
  const starTexture = texture('star.png')
  const stars: Star[] = []
  const starBirthIntervalId = setInterval(() => {
    const star = new PIXI.Sprite(starTexture) as Star
    star.anchor.set(0.5)
    star.x = randomScreenX()
    star.y = randomScreenY()
    star.alphaVelocity = random(-PREF.STAR_MAX_ALPHA_VELOCITY, PREF.STAR_MAX_ALPHA_VELOCITY)
    star.alpha = 0
    // star.scaleMax = Math.random().remap([0, 1], [0.1, 0.3])
    star.scale.set(Math.random().remap([0, 1], [0.4, 0.8]))
    app.stage.addChild(star)
    stars.push(star)
    if (stars.length == PREF.STAR_COUNT) {
      clearTimeout(starBirthIntervalId)
    }
  }, PREF.STAR_BIRTH_INTERVAL)

  // meteor
  const meteorAnchor = new PIXI.Container()
  meteorAnchor.x = 200
  meteorAnchor.angle = -70

  const meteor = new PIXI.Graphics()
  const gradient = createGradient('rgba(95, 220, 255, 0)', 'rgba(255, 255, 255, 255)')
  meteor.beginTextureFill({ texture: gradient })
  meteor.drawRect(0, 0, 5, 100)
  meteor.endFill()
  meteor.scale.y = PREF.METEOR_START_LENGTH_MOD
  meteor.y = -meteor.height
  meteor.visible = false
  //   meteor.filters = [new AdvancedBloomFilter({ threshold: 0.2, blur: 12, bloomScale: 2, brightness: 1 })]
  meteorAnchor.addChild(meteor)
  app.stage.addChild(meteorAnchor)
  setTimeout(() => {
    meteor.visible = true
  }, 3000)

  const stageHeight = app.renderer.height
  const textureHeight = 276

  // clouds
  const cloudTexture = texture('cloud.png')
  const cloud = new PIXI.TilingSprite(cloudTexture, 600, textureHeight)
  cloud.width = app.renderer.width
  cloud.y -= 150
  cloud.alpha = 0.5
  cloud.scale.set(1.5)
  app.stage.addChild(cloud)

  const cloud2 = new PIXI.TilingSprite(cloudTexture, 600, textureHeight)
  cloud2.width = app.renderer.width
  cloud2.y -= 50
  cloud2.tilePosition.x += 500
  cloud2.alpha = 0.5
  app.stage.addChild(cloud2)

  const cloud3 = new PIXI.TilingSprite(cloudTexture, 600, textureHeight)
  cloud3.width = app.renderer.width
  cloud3.scale.set(stageHeight.remap([0, textureHeight], [0, 0.5]))
  cloud3.tilePosition.x += 300
  cloud3.alpha = 0.5
  app.stage.addChild(cloud3)

  //   const cloud4 = new PIXI.TilingSprite(cloudTexture, 600, textureHeight)
  //   cloud4.width = app.renderer.width
  //   cloud4.alpha = 0.5
  //   cloud4.scale.set(stageHeight.remap([0, textureHeight], [0, 0.8]))
  //   cloud4.tilePosition.x += 400
  //   app.stage.addChild(cloud4)

  //   const cloud5 = new PIXI.TilingSprite(cloudTexture, 600, textureHeight)
  //   cloud5.width = app.renderer.width
  //   cloud5.alpha = 0.5
  //   cloud5.scale.set(stageHeight.remap([0, textureHeight], [0, 1]))
  //   cloud5.tilePosition.x += 500
  //   app.stage.addChild(cloud5)

  // ticker
  app.ticker.add(() => {
    // fade in
    if (app.stage.alpha < 1) {
      app.stage.alpha += 0.005
      if (app.stage.alpha > 1) app.stage.alpha = 1
    }

    // star
    stars.forEach(star => {
      if (star.alpha >= 1) {
        star.alphaVelocity = -star.alphaVelocity
      } else if (star.alpha <= 0) {
        star.x = randomScreenX()
        star.y = EasingFunctions.easeInQuad(Math.random()).remap([0, 1], [0, app.renderer.height])
        star.alphaVelocity = -star.alphaVelocity
      }
      star.alpha += star.alphaVelocity
      //   star.scale.set(Math.min(star.scale.x + star.alphaVelocity, star.scaleMax))
    })

    // meteor
    if (meteor.visible) {
      meteor.y += PREF.METEOR_VELOCITY
      meteor.scale.y *= 0.98
      meteor.scale.x *= 0.99
      meteor.alpha *= 0.99

      if (meteor.alpha < 0.1) {
        meteor.visible = false
        meteor.scale.y = PREF.METEOR_START_LENGTH_MOD
        meteor.scale.x = 1
        meteor.y = -meteor.height

        meteor.alpha = 1
        if (random(0, 1) > 0.5) {
          meteorAnchor.x = random(-200, app.renderer.width / 2 - 200)
          meteorAnchor.angle = -random(55, 80)
        } else {
          meteorAnchor.x = random(app.renderer.width / 2 + 200, app.renderer.width + 200)
          meteorAnchor.angle = random(55, 80)
        }
        setTimeout(() => {
          meteor.visible = true
        }, random(PREF.METEOR_BIRTH_INTERVAL_RANGE.MIN, PREF.METEOR_BIRTH_INTERVAL_RANGE.MAX))
      }
    }

    // clouds
    cloud.tilePosition.x -= 0.2
    cloud2.tilePosition.x = 0.2
    cloud3.tilePosition.x += 0.4
    // cloud4.tilePosition.x += 0.6
    // cloud5.tilePosition.x += 0.8
  })
})

function createGradient(from: string, to: string) {
  const c = document.createElement('canvas')
  const ctx = c.getContext('2d')
  const grd = ctx.createLinearGradient(0, 0, 0, 100)
  grd.addColorStop(0, from)
  grd.addColorStop(1, to)
  ctx.fillStyle = grd
  ctx.fillRect(0, 0, 100, 100)
  return PIXI.Texture.from(c)
}

const EasingFunctions = {
  linear(t: number) {
    return t
  },
  easeInQuad(t: number) {
    return t * t
  },
  easeOutQuad(t: number) {
    return t * (2 - t)
  },
  easeInOutQuad(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  },
  easeInCubic(t: number) {
    return t * t * t
  },
  easeOutCubic(t: number) {
    return --t * t * t + 1
  },
  easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  },
  easeInQuart(t: number) {
    return t * t * t * t
  },
  easeOutQuart(t: number) {
    return 1 - --t * t * t * t
  },
  easeInOutQuart(t: number) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
  },
  easeInQuint(t: number) {
    return t * t * t * t * t
  },
  easeOutQuint(t: number) {
    return 1 + --t * t * t * t * t
  },
  easeInOutQuint(t: number) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
  },
}
