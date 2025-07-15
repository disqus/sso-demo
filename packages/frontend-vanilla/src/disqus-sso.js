/**
 * Disqus SSO Client - Vanilla JavaScript
 * Handles communication with the SSO backend and Disqus integration
 */

class DisqusSSOClient {
  constructor(apiUrl) {
    this.apiUrl = apiUrl || 'http://localhost:8787';
  }

  /**
   * Generate SSO authentication data from the backend
   * @param {Object} user - User object with username, id, email, etc.
   * @returns {Promise<Object>} SSO data from backend
   */
  async generateSSO(user) {
    const response = await fetch(`${this.apiUrl}/sso`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate SSO');
    }

    return await response.json();
  }

  /**
   * Check if the backend is healthy
   * @returns {Promise<Object>} Health status
   */
  async checkHealth() {
    const response = await fetch(`${this.apiUrl}/health`);
    return await response.json();
  }

  /**
   * Initialize Disqus with SSO authentication
   * @param {Object} user - User object
   * @param {string} shortname - Your Disqus shortname
   * @param {Object} pageConfig - Additional page configuration
   */
  async initializeDisqusWithSSO(user, shortname, pageConfig = {}) {
    try {
      const ssoData = await this.generateSSO(user);
      
      // Configure Disqus with SSO
      window.disqus_config = function () {
        this.page.remote_auth_s3 = ssoData.sso.auth;
        this.page.api_key = ssoData.sso.pubKey;
        
        // Apply additional page configuration
        Object.assign(this.page, pageConfig);
      };

      // Load Disqus embed script
      this.loadDisqusEmbed(shortname);
      
      return ssoData;
    } catch (error) {
      console.error('Failed to initialize Disqus with SSO:', error);
      throw error;
    }
  }

  /**
   * Refresh Disqus authentication with new user data
   * @param {Object} user - New user object
   */
  async refreshDisqusAuth(user) {
    try {
      const ssoData = await this.generateSSO(user);
      
      if (window.DISQUS) {
        window.DISQUS.reset({
          reload: true,
          config: function () {
            this.page.remote_auth_s3 = ssoData.sso.auth;
            this.page.api_key = ssoData.sso.pubKey;
          }
        });
      }
      
      return ssoData;
    } catch (error) {
      console.error('Failed to refresh Disqus auth:', error);
      throw error;
    }
  }

  /**
   * Load the Disqus embed script
   * @param {string} shortname - Your Disqus shortname
   */
  loadDisqusEmbed(shortname) {
    if (document.getElementById('disqus-embed-script')) {
      return; // Already loaded
    }

    const script = document.createElement('script');
    script.id = 'disqus-embed-script';
    script.src = `https://${shortname}.disqus.com/embed.js`;
    script.setAttribute('data-timestamp', +new Date());
    (document.head || document.body).appendChild(script);
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DisqusSSOClient;
}

// Global assignment for browser usage
if (typeof window !== 'undefined') {
  window.DisqusSSOClient = DisqusSSOClient;
}
